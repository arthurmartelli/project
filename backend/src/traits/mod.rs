use sqlx::{
    mysql::{MySqlQueryResult, MySqlRow},
    Error, FromRow, MySqlPool,
};

pub trait Crud<'a, T: FromRow<'a, MySqlRow>> {
    fn id(&self) -> String;

    fn table() -> &'static str;

    async fn create(&self, pool: &'a MySqlPool) -> Result<(), Error>;

    async fn read(pool: &'a MySqlPool, id: String) -> Result<MySqlRow, Error> {
        sqlx::query(format!("SELECT * FROM {} WHERE id = ?", Self::table()).as_str())
            .bind(id)
            .fetch_one(pool)
            .await
    }

    async fn read_all(pool: &'a MySqlPool) -> Result<Vec<MySqlRow>, Error> {
        sqlx::query(format!("SELECT * FROM {}", Self::table()).as_str())
            .fetch_all(pool)
            .await
    }

    async fn update(&self, pool: &'a MySqlPool) -> Result<MySqlQueryResult, Error>;

    async fn delete(&self, pool: &'a MySqlPool) -> Result<(), Error> {
        sqlx::query!(r#"DELETE FROM clients WHERE id = ?"#, self.id())
            .execute(pool)
            .await?;

        Ok(())
    }
}
