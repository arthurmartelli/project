use chrono::DateTime;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

use crate::traits::Model;

#[derive(Debug, Deserialize)]
pub struct BaseItem {
    pub description: String,
    pub quantity: u16,
    pub price: u32,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Item {
    pub id: String,
    pub description: String,
    pub quantity: u16,
    pub price: u32,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

impl Model<BaseItem> for Item {
    fn id(&self) -> String {
        self.id.clone()
    }

    fn model() -> &'static str {
        "items"
    }

    fn new(data: BaseItem) -> Self {
        Item {
            id: uuid::Uuid::new_v4().to_string(),
            description: data.description,
            quantity: data.quantity,
            price: data.price,
            created_at: None,
            updated_at: None,
        }
    }

    fn validate(&self) -> Result<(), String> {
        // Define validation conditions
        let validations = vec![
            Uuid::parse_str(self.id.as_str()).is_ok(),
            self.description.trim().is_empty(),
            self.quantity <= 0,
            self.price <= 0,
        ];

        // Check if any validation condition is true
        if validations.iter().any(|&v| v) {
            return Err(format!("Invalid Item: {:?}", self));
        }

        Ok(())
    }
}
