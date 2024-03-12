mod handlers;
mod models;
mod traits;

use actix_cors::Cors;
use actix_web::{
    http::header::{self, HeaderName},
    middleware::Logger,
    web, App, HttpServer,
};
use dotenv::dotenv;
use sqlx::mysql::{MySqlPool, MySqlPoolOptions};

pub struct AppState {
    db: MySqlPool,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    if std::env::var_os("RUST_LOG").is_none() {
        std::env::set_var("RUST_LOG", "actix_web=info");
    }

    dotenv().ok();
    env_logger::init();

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = match MySqlPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await
    {
        Ok(pool) => {
            println!("✅ Connection to the database is successful!");
            pool
        }
        Err(err) => {
            println!("🔥 Failed to connect to the database: {:?}", err);
            std::process::exit(1);
        }
    };

    const IPV4: std::net::Ipv4Addr = std::net::Ipv4Addr::new(127, 0, 0, 1);
    const PORT: u16 = 8000;
    const ALLOWED_METHODS: [&str; 4] = ["GET", "POST", "PATCH", "DELETE"];
    const ALLOWED_HEADERS: [HeaderName; 3] =
        [header::CONTENT_TYPE, header::AUTHORIZATION, header::ACCEPT];

    println!("🚀 Server started successfully at http://{}:{}", IPV4, PORT);

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(ALLOWED_METHODS)
            .allowed_headers(ALLOWED_HEADERS)
            .supports_credentials();

        App::new()
            .app_data(web::Data::new(AppState { db: pool.clone() }))
            .configure(handlers::config)
            .wrap(cors)
            .wrap(Logger::default())
    })
    .bind((IPV4, PORT))
    .expect(format!("IP or port unavailable: {IPV4}:{PORT}").as_str())
    .run()
    .await
}
