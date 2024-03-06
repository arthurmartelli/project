use actix_web::{get, post, web, HttpResponse, Responder};
use serde::Deserialize;

use crate::{models::Client, traits::Crud, AppState};

// Define a struct for representing client data
#[derive(Debug, Deserialize)]
pub struct CreateClient {
    // Define fields for client data
    pub gov_id: String,
    pub name: String,
    pub phone: String,
    pub email: String,
    pub address: String,
}

#[get("/")]
async fn get_all(data: web::Data<AppState>) -> impl Responder {
    match Client::read_all(&data.db).await {
        Ok(_) => HttpResponse::Ok().body("Client created successfully"),
        Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
    }
}

#[get("/{id}")]
async fn get(path: web::Path<uuid::Uuid>, data: web::Data<AppState>) -> impl Responder {
    let id = path.into_inner().to_string();

    match Client::read(&data.db, id).await {
        Ok(_) => HttpResponse::Ok().body("Client created successfully"),
        Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
    }
}

#[post("/")]
async fn create_client(
    client_data: web::Json<CreateClient>,
    data: web::Data<AppState>,
) -> impl Responder {
    let client_data = client_data.into_inner(); // Extract ClientData from Json
    let id = uuid::Uuid::new_v4();

    let client = Client {
        id: id.to_string(),
        gov_id: client_data.gov_id,
        name: client_data.name,
        phone: Some(client_data.phone),
        email: Some(client_data.email),
        address: Some(client_data.address),
        created_at: None,
        updated_at: None,
    };

    match client.create(&data.db).await {
        Ok(_) => HttpResponse::Ok().body("Client created successfully"),
        Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
    }
}

pub fn config(conf: &mut web::ServiceConfig) {
    let scope = web::scope("/clients")
        .service(get_all)
        .service(get)
        .service(create_client);

    conf.service(scope);
}
