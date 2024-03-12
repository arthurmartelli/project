use actix_web::{get, web, HttpResponse, Responder};
use serde::Deserialize;

use crate::AppState;
mod clients;
mod receipts;

type WebAppState = web::Data<AppState>;

pub fn config(conf: &mut web::ServiceConfig) {
    let scope = web::scope("")
        .service(status)
        .configure(clients::config)
        .configure(receipts::config);

    conf.service(scope);
}

#[get("/status")]
async fn status() -> impl Responder {
    const MESSAGE: &str = "Status OK";

    HttpResponse::Ok().json(serde_json::json!({
        "status": "success",
        "message": MESSAGE
    }))
}

#[derive(Deserialize)]
pub struct Pagination {
    pub page_size: Option<u32>,
    pub page_number: Option<u32>,
}

pub const DEFAULT_PAGE_SIZE: u32 = 10;
pub const DEFAULT_PAGE_NUMBER: u32 = 1;
