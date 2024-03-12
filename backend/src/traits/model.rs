pub trait Model<BaseModel> {
    fn id(&self) -> String;

    fn model() -> &'static str;

    fn validate(&self) -> Result<(), String>;

    fn new(data: BaseModel) -> Self;
}
