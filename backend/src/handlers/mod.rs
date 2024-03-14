use actix_web::{get, web};
use serde::Deserialize;

use crate::AppState;
mod clients;
mod receipts;

use maud::{html, Markup};

type WebAppState = web::Data<AppState>;

pub fn config(conf: &mut web::ServiceConfig) {
    let api_handler = web::scope("/api")
        .service(status)
        .configure(clients::config)
        .configure(receipts::config);

    conf.service(api_handler);
}

#[get("/status")]
async fn status() -> Markup {
    html! {
        h1 { "Hello! The server is working"}
        p { "Nice to meet you!" }
    }
}

#[derive(Deserialize)]
pub struct Pagination {
    pub page_size: Option<u32>,
    pub page_number: Option<u32>,
}

pub const DEFAULT_PAGE_SIZE: u32 = 10;
pub const DEFAULT_PAGE_NUMBER: u32 = 1;
