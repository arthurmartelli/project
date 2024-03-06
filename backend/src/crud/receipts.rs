use crate::{models::Receipt, traits::Crud};
use sqlx::{mysql::MySqlQueryResult, Error, MySqlPool};

impl<'a> Crud<'a, Receipt> for Receipt {
    fn id(&self) -> String {
        self.id.clone()
    }

    fn table() -> &'static str {
        "receipts"
    }

    async fn create(&self, pool: &'a MySqlPool) -> Result<(), Error> {
        if let Err(e) = self.validate() {
            return Err(Error::Configuration(e.into()));
        }

        sqlx::query!(
            r#"
            INSERT INTO receipts (id, total_amount, client_id)
            VALUES (?, ?, ?)
            "#,
            self.id,
            self.total_amount,
            self.client_id,
        )
        .execute(pool)
        .await?;

        Ok(())
    }

    async fn update(&self, pool: &'a MySqlPool) -> Result<MySqlQueryResult, Error> {
        if let Err(e) = self.validate() {
            return Err(Error::Configuration(e.into()));
        }

        let result = sqlx::query!(
            r#"
            UPDATE receipts SET total_amount = ?, client_id = ? WHERE id = ?
            "#,
            self.total_amount,
            self.client_id,
            self.id
        )
        .execute(pool)
        .await?;

        Ok(result)
    }
}
