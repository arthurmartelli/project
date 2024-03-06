use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Client {
    pub id: String,
    pub gov_id: String,
    pub name: String,
    pub phone: Option<String>,
    pub email: Option<String>,
    pub address: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

impl Client {
    pub fn validate(&self) -> Result<(), String> {
        // Define validation conditions
        let validations = vec![
            Uuid::parse_str(self.id.as_str()).is_ok(),
            self.gov_id.trim().is_empty(),
            self.name.trim().is_empty(),
            self.email
                .as_ref()
                .map_or(false, |email| !email.contains('@')),
        ];

        // Check if any validation condition is true
        if validations.iter().any(|&v| v) {
            return Err(format!("Invalid Client: {:?}", self));
        }

        Ok(())
    }
}
