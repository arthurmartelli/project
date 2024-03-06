use chrono::DateTime;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;


#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Receipt {
    pub id: String,
    pub total_amount: u32,
    pub client_id: String,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}


impl Receipt {
    pub fn validate(&self) -> Result<(), String> {
        let validations = vec![
            Uuid::parse_str(self.id.as_str()).is_ok(),
            Uuid::parse_str(self.client_id.as_str()).is_ok(),
            self.total_amount <= 0,
            self.created_at.unwrap() > chrono::Utc::now(),
        ];

        if validations.iter().any(|&v| v) {
            return Err(format!("Invalid Receipt: {:?}", self));
        }

        Ok(())
    }
}
