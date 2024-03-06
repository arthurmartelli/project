use chrono::DateTime;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Item {
    pub id: String,
    pub description: String,
    pub quantity: u16,
    pub price: u32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl Item {
    pub fn validate(&self) -> Result<(), String> {
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
