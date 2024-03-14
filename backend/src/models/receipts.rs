use chrono::DateTime;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

use crate::traits::Model;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BaseReceipt {
    pub total_amount: u32,
    pub client_id: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Receipt {
    pub id: String,
    pub total_amount: u32,
    pub client_id: String,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

impl Model<BaseReceipt> for Receipt {
    fn id(&self) -> String {
        self.id.clone()
    }

    fn model() -> &'static str {
        "receipts"
    }

    fn new(data: BaseReceipt) -> Self {
        Receipt {
            id: uuid::Uuid::new_v4().to_string(),
            total_amount: data.total_amount,
            client_id: data.client_id,
            created_at: None,
            updated_at: None,
        }
    }

    fn validate(&self) -> Result<(), String> {
        let validations = [
            Uuid::parse_str(self.id.as_str()).is_err(),
            Uuid::parse_str(self.client_id.as_str()).is_ok(),
            self.created_at.unwrap() > chrono::Utc::now(),
        ];

        if validations.iter().any(|&v| v) {
            return Err(format!("Invalid Receipt: {:?}", self));
        }

        Ok(())
    }
}
