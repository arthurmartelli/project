use sqlx::{mysql::MySqlRow, Error, FromRow, MySqlPool};

pub trait Crud<'a, T> {
    fn id(&self) -> String;

    fn table() -> &'static str;

    async fn create(&self, pool: &'a MySqlPool) -> Result<(), Error>;

    async fn read(&self, pool: &'a MySqlPool) -> Result<T, Error>;

    async fn read_all(pool: &'a MySqlPool) -> Result<Vec<T>, Error>;

    async fn update(&self, pool: &'a MySqlPool) -> Result<T, Error>;

    async fn delete(&self, pool: &'a MySqlPool) -> Result<(), Error>;
}
