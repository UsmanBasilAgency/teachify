const DARK_MODE_CLASS_NAME = "dark";

enum Tables {
    messages = "messages",
    userRoles = "userroles",
    courses = "courses",
    userCourses = "usercourses"
}

enum Role {
    admin = "admin",
    student = "student",
    professor = "professor"
}

enum Models {
    mistral = "mistralai/mistral-7b-instruct",


    /*
        NEVER USE ANY OF THE BELOW
    */
    huggingFace = "huggingfaceh4/zephyr-7b-beta",
    openChat = "openchat/openchat-7b",
    capybara = "nousresearch/nous-capybara-7b",
    mythoMist = "gryphe/mythomist-7b",
    gpt3 = "openai/gpt-3.5-turbo"
}

export { DARK_MODE_CLASS_NAME, Tables, Models, Role };
