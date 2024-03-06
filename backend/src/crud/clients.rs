use crate::{models::Client, traits::Crud};
use sqlx::{mysql::MySqlQueryResult, Error, MySqlPool};

impl<'a> Crud<'a, Client> for Client {
    fn id(&self) -> String {
        self.id.clone()
    }

    fn table() -> &'static str {
        "clients"
    }

    async fn create(&self, pool: &'a MySqlPool) -> Result<(), Error> {
        if let Err(e) = self.validate() {
            return Err(Error::Configuration(e.into()));
        }

        sqlx::query!(
            r#"
            INSERT INTO clients (id, gov_id, name, phone, email, address)
            VALUES (?, ?, ?, ?, ?, ?)
            "#,
            self.id,
            self.gov_id,
            self.name,
            self.phone,
            self.email,
            self.address,
        )
        .execute(pool)
        .await?;

        Ok(())
    }

    async fn update(&self, pool: &'a MySqlPool) -> Result<MySqlQueryResult, Error> {
        if let Err(e) = self.validate() {
            return Err(Error::Configuration(e.into()));
        }

        let client = sqlx::query_as!(
            Client,
            r#"
            UPDATE clients SET gov_id = ?, name = ?, phone = ?, email = ?, address = ?
            WHERE id = ?
            "#,
            self.gov_id,
            self.name,
            self.phone,
            self.email,
            self.address,
            self.id
        )
        .execute(pool)
        .await;

        client
    }
}
