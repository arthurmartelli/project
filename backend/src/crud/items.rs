use crate::{models::Item, traits::Crud};
use sqlx::MySqlPool;

impl<'a> Crud<'a, Item> for Item {
    async fn create(&self, pool: &'a MySqlPool) -> Result<(), sqlx::Error> {
        todo!()
    }

    async fn read_all(pool: &'a MySqlPool) -> Result<Vec<Self>, sqlx::Error> {
        todo!()
    }

    async fn update(&self, pool: &'a MySqlPool) -> Result<Self, sqlx::Error> {
        todo!()
    }

    async fn delete(&self, pool: &'a MySqlPool) -> Result<(), sqlx::Error> {
        todo!()
    }

    fn id(&self) -> String {
        todo!()
    }

    async fn read(&self, pool: &'a MySqlPool) -> Result<Item, sqlx::Error> {
        todo!()
    }

    fn table() -> &'static str {
        todo!()
    }
}
