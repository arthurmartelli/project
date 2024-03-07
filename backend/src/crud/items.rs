use crate::{models::Item, traits::Crud};
use sqlx::{mysql::MySqlQueryResult, Error, MySqlPool};

impl<'a> Crud<'a, Item> for Item {
    fn id(&self) -> String {
        self.id.clone()
    }

    fn table() -> &'static str {
        "items"
    }

    async fn create(&self, pool: &'a MySqlPool) -> Result<(), Error> {
        if let Err(e) = self.validate() {
            return Err(Error::Configuration(e.into()));
        }

        sqlx::query!(
            r#"
            INSERT INTO items (id, description, price)
            VALUES (?, ?, ?)
            "#,
            self.id,
            self.description,
            self.price,
        )
        .execute(pool)
        .await?;

        Ok(())
    }

    async fn update(&self, pool: &'a MySqlPool) -> Result<MySqlQueryResult, Error> {
        if let Err(e) = self.validate() {
            return Err(Error::Configuration(e.into()));
        }

        sqlx::query!(
            r#"
            UPDATE items SET description = ?, price = ? WHERE id = ?
            "#,
            self.description,
            self.price,
            self.id
        )
        .execute(pool)
        .await
    }
}
