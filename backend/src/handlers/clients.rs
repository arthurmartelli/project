use actix_web::{delete, get, post, put, web, HttpResponse, Responder};

use crate::{
    handlers::{Pagination, WebAppState, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE},
    models::{BaseClient, Client, Receipt},
    traits::Model,
};

#[post("")]
async fn create_client(pool: WebAppState, client_data: web::Form<BaseClient>) -> impl Responder {
    let client_data = client_data.into_inner();

    let client = Client::new(client_data);

    // Validate client data
    if let Err(validation_error) = client.validate() {
        return HttpResponse::BadRequest().body(validation_error);
    }

    let result = sqlx::query!(
        "INSERT INTO clients (id, gov_id, name, phone, email, address) VALUES (?, ?, ?, ?, ?, ?)",
        client.id,
        client.gov_id,
        client.name,
        client.phone,
        client.email,
        client.address
    )
    .execute(&pool.db)
    .await;

    match result {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().body("Error creating client"),
    }
}

#[put("/{id}")]
async fn update_client(
    pool: WebAppState,
    client_data: web::Form<BaseClient>,
    id: web::Path<String>,
) -> impl Responder {
    let client_data = client_data.into_inner();

    let client = Client::new(client_data);

    // Validate client data
    if let Err(validation_error) = client.validate() {
        return HttpResponse::BadRequest().body(validation_error);
    }

    let result = sqlx::query!(
        "UPDATE clients SET gov_id = ?, name = ?, phone = ?, email = ?, address = ? WHERE id = ?",
        client.gov_id,
        client.name,
        client.phone,
        client.email,
        client.address,
        id.into_inner()
    )
    .execute(&pool.db)
    .await;

    match result {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().body("Error updating client"),
    }
}

#[delete("/{id}")]
async fn delete_client(pool: WebAppState, id: web::Path<String>) -> impl Responder {
    let result = sqlx::query!("DELETE FROM clients WHERE id = ?", id.into_inner())
        .execute(&pool.db)
        .await;

    match result {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().body("Error deleting client"),
    }
}

#[get("")]
async fn get_all_clients(pool: WebAppState, params: web::Query<Pagination>) -> impl Responder {
    let page_number = params.page_number.unwrap_or(DEFAULT_PAGE_NUMBER);
    let page_size = params.page_size.unwrap_or(DEFAULT_PAGE_SIZE);

    let offset = (page_number - 1) * page_size;

    let clients = sqlx::query_as!(
        Client,
        "SELECT * FROM clients LIMIT ? OFFSET ?",
        page_size,
        offset
    )
    .fetch_all(&pool.db)
    .await;

    match clients {
        Ok(clients) => HttpResponse::Ok().json(clients),
        Err(_) => HttpResponse::InternalServerError().body("Error retrieving clients"),
    }
}

#[get("/{id}")]
async fn get_client_by_id(pool: WebAppState, id: web::Path<String>) -> impl Responder {
    let id = id.into_inner();
    let client = sqlx::query_as!(Client, "SELECT * FROM clients WHERE id = ?", id)
        .fetch_optional(&pool.db)
        .await;

    match client {
        Ok(Some(client)) => HttpResponse::Ok().json(client),
        Ok(None) => HttpResponse::NotFound().body("Client not found"),
        Err(_) => HttpResponse::InternalServerError().body("Error retrieving client"),
    }
}

#[get("/gov-id/{gov_id}")]
async fn get_client_by_gov_id(pool: WebAppState, gov_id: web::Path<String>) -> impl Responder {
    let gov_id = gov_id.into_inner();
    let client = sqlx::query_as!(Client, "SELECT * FROM clients WHERE gov_id = ?", gov_id)
        .fetch_optional(&pool.db)
        .await;

    match client {
        Ok(Some(client)) => HttpResponse::Ok().json(client),
        Ok(None) => HttpResponse::NotFound().body("Client not found"),
        Err(_) => HttpResponse::InternalServerError().body("Error retrieving client"),
    }
}

#[get("/{client_id}/receipts")]
async fn get_client_receipts(pool: WebAppState, client_id: web::Path<String>) -> impl Responder {
    let client_id = client_id.into_inner();
    let receipts = sqlx::query_as!(
        Receipt,
        "SELECT * FROM receipts WHERE client_id = ?",
        client_id
    )
    .fetch_all(&pool.db)
    .await;

    match receipts {
        Ok(receipts) => HttpResponse::Ok().json(
            receipts
                .iter()
                .filter(|r| r.validate().is_ok())
                .collect::<Vec<_>>(),
        ),
        Err(_) => HttpResponse::InternalServerError().body("Error retrieving receipts"),
    }
}

pub fn config(conf: &mut web::ServiceConfig) {
    let scope = web::scope("/clients")
        .service(create_client)
        .service(update_client)
        .service(delete_client)
        .service(get_all_clients)
        .service(get_client_receipts);

    conf.service(scope);
}
