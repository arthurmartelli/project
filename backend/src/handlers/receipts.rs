use actix_web::{delete, get, post, put, web, HttpResponse, Responder};

use crate::{
    handlers::{Pagination, WebAppState, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE},
    models::{BaseItem, BaseReceipt, Item, Receipt},
    traits::Model,
};

#[post("")]
async fn create_receipt(pool: WebAppState, receipt_data: web::Form<BaseReceipt>) -> impl Responder {
    // Extract receipt data from the request
    let receipt_data = receipt_data.into_inner();

    // Create a new receipt instance
    let receipt = Receipt::new(receipt_data);

    // Validate receipt data
    if let Err(validation_error) = receipt.validate() {
        return HttpResponse::BadRequest().body(validation_error);
    }

    // Insert the new receipt into the database
    let result = sqlx::query!(
        "INSERT INTO receipts (id, total_amount, client_id) VALUES (?, ?, ?)",
        receipt.id,
        receipt.total_amount,
        receipt.client_id
    )
    .execute(&pool.db)
    .await;

    match result {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().body("Error creating receipt"),
    }
}

#[put("/{id}")]
async fn update_receipt(
    pool: WebAppState,
    receipt_data: web::Form<BaseReceipt>,
    id: web::Path<String>,
) -> impl Responder {
    // Extract receipt data from the request
    let receipt_data = receipt_data.into_inner();

    // Create a new receipt instance
    let receipt = Receipt::new(receipt_data);

    // Validate receipt data
    if let Err(validation_error) = receipt.validate() {
        return HttpResponse::BadRequest().body(validation_error);
    }

    // Update the receipt in the database
    let result = sqlx::query!(
        "UPDATE receipts SET total_amount = ?, client_id = ? WHERE id = ?",
        receipt.total_amount,
        receipt.client_id,
        id.into_inner()
    )
    .execute(&pool.db)
    .await;

    match result {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().body("Error updating receipt"),
    }
}

#[delete("/{id}")]
async fn delete_receipt(pool: WebAppState, id: web::Path<String>) -> impl Responder {
    // Delete the receipt from the database
    let result = sqlx::query!("DELETE FROM receipts WHERE id = ?", id.into_inner())
        .execute(&pool.db)
        .await;

    match result {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().body("Error deleting receipt"),
    }
}

#[get("")]
async fn get_all_receipts(pool: WebAppState, params: web::Query<Pagination>) -> impl Responder {
    let page_number = params.page_number.unwrap_or(DEFAULT_PAGE_NUMBER);
    let page_size = params.page_size.unwrap_or(DEFAULT_PAGE_SIZE);

    let offset = (page_number - 1) * page_size;

    let receipts = sqlx::query_as!(
        Receipt,
        "SELECT * FROM receipts LIMIT ? OFFSET ?",
        page_size,
        offset
    )
    .fetch_all(&pool.db)
    .await;

    match receipts {
        Ok(receipts) => HttpResponse::Ok().json(receipts),
        Err(_) => HttpResponse::InternalServerError().body("Error retrieving receipts"),
    }
}

#[get("/{id}")]
async fn get_receipt_by_id(pool: WebAppState, id: web::Path<String>) -> impl Responder {
    // Fetch the receipt by ID from the database
    let id = id.into_inner();
    let receipt = sqlx::query_as!(Receipt, "SELECT * FROM receipts WHERE id = ?", id)
        .fetch_optional(&pool.db)
        .await;

    match receipt {
        Ok(Some(receipt)) => HttpResponse::Ok().json(receipt),
        Ok(None) => HttpResponse::NotFound().body("Receipt not found"),
        Err(_) => HttpResponse::InternalServerError().body("Error retrieving receipt"),
    }
}

#[get("/client/{client_id}")]
async fn get_receipts_by_client(pool: WebAppState, client_id: web::Path<String>) -> impl Responder {
    let client_id = client_id.into_inner();
    let receipts = sqlx::query_as!(
        Receipt,
        "SELECT * FROM receipts WHERE client_id = ?",
        client_id
    )
    .fetch_all(&pool.db)
    .await;

    match receipts {
        Ok(receipts) => HttpResponse::Ok().json(receipts),
        Err(_) => HttpResponse::InternalServerError().body("Error retrieving receipts"),
    }
}

#[post("/add-items")]
async fn add_items(pool: WebAppState, items_data: web::Json<Vec<BaseItem>>) -> impl Responder {
    let items_data = items_data.into_inner();

    let mut success_count = 0;

    for item_data in items_data {
        let item = Item::new(item_data);

        if let Err(validation_error) = item.validate() {
            return HttpResponse::BadRequest().body(validation_error);
        }

        // Insert the item into the database
        let result = sqlx::query!(
            "INSERT INTO items (id, description, quantity, price) VALUES (?, ?, ?, ?)",
            item.id,
            item.description,
            item.quantity,
            item.price
        )
        .execute(&pool.db)
        .await;

        match result {
            Ok(_) => success_count += 1,
            Err(_) => return HttpResponse::InternalServerError().body("Error creating item"),
        }
    }

    HttpResponse::Created().body(format!("Successfully added {} items", success_count))
}

// Configure receipts API routes
pub fn config(conf: &mut web::ServiceConfig) {
    let scope = web::scope("/receipts")
        .service(create_receipt)
        .service(update_receipt)
        .service(delete_receipt)
        .service(get_all_receipts)
        .service(get_receipt_by_id)
        .service(get_receipts_by_client)
        .service(add_items);

    conf.service(scope);
}
