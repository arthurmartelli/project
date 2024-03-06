use actix_web::{get, web, HttpResponse, Responder};
pub mod clients;

pub fn config(conf: &mut web::ServiceConfig) {
    let scope = web::scope("/api").service(health);

    conf.service(scope);
}

#[get("/health")]
async fn health() -> impl Responder {
    const MESSAGE: &str = "Status OK";

    HttpResponse::Ok().json(serde_json::json!({
        "status": "success",
        "message": MESSAGE
    }))
}
