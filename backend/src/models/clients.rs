use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

use crate::traits::Model;

#[derive(Debug, Deserialize)]
pub struct BaseClient {
    pub gov_id: String,
    pub name: String,
    pub phone: Option<String>,
    pub email: Option<String>,
    pub address: Option<String>,
}

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

impl Model<BaseClient> for Client {
    fn id(&self) -> String {
        self.id.clone()
    }

    fn model() -> &'static str {
        "clients"
    }

    fn new(data: BaseClient) -> Self {
        Client {
            id: uuid::Uuid::new_v4().to_string(),
            gov_id: data.gov_id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            created_at: None,
            updated_at: None,
        }
    }

    fn validate(&self) -> Result<(), String> {
        // Define validation conditions
        let validations = vec![
            !Uuid::parse_str(self.id.as_str()).is_ok(), // Check if ID is not a valid UUID
            self.gov_id.trim().is_empty(),              // Check if gov_id is empty
            self.name.trim().is_empty(),                // Check if name is empty
            self.email // Check if email is present and contains '@'
                .as_ref()
                .map_or(true, |email| !email.contains('@')),
        ];

        // Check if any validation condition is true
        if validations.iter().any(|&v| v) {
            return Err(format!("Invalid Client: {:?}", self));
        }

        Ok(())
    }
}
