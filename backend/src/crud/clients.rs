use crate::{models::Client, traits::Crud};
use sqlx::{Error, FromRow, MySqlPool};

impl<'a> Crud<'a, Client> for Client {
    async fn create(&self, pool: &'a MySqlPool) -> Result<(), Error> {
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

    async fn read_all(pool: &'a MySqlPool) -> Result<Vec<Self>, Error> {
        let clients = sqlx::query_as!(
            Client,
            r#"
            SELECT * FROM clients
            "#
        )
        .fetch_all(pool)
        .await?;

        Ok(clients)
    }

    async fn update(&self, pool: &'a MySqlPool) -> Result<Self, Error> {
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
        .fetch_one(pool)
        .await?;

        Client::from_row(&client)
    }

    async fn delete(&self, pool: &'a MySqlPool) -> Result<(), Error> {
        sqlx::query!(
            r#"
            DELETE FROM clients WHERE id = ?
            "#,
            self.id
        )
        .execute(pool)
        .await?;

        Ok(())
    }

    fn id(&self) -> String {
        todo!()
    }

    fn table() -> &'static str {
        todo!()
    }

    async fn read(&self, pool: &'a MySqlPool) -> Result<Client, Error> {
        todo!()
    }
}
