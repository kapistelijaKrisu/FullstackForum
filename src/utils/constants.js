const CONSTANTS = {

    CATEGORY: {
        VALIDATATION: {
            NAME_LENGTH_MIN: 2,
            NAME_LENGTH_MAX: 31,
            DESCRIPTION_LENGTH_MIN: 2,
            DESCRIPTION_LENGTH_MAX: 31
        },

    },
    COMMENT: {
        VALIDATATION: {
            CONTENT_LENGTH_MIN: 1,
            CONTENT_LENGTH_MAX: 2023
        }
    },
    DUDE: {
        VALIDATATION: {
            USERNAME_LENGTH_MIN: 3,
            USERNAME_LENGTH_MAX: 31,
            PASSWORD_LENGTH_MIN: 3,
            PASSWORD_LENGTH_MAX: 31,
        }
    },
    FORUMPOST: {
        VALIDATATION: {
            TITLE_LENGTH_MIN: 2,
            TITLE_LENGTH_MAX: 31,
            CONTENT_LENGTH_MIN: 2,
            CONTENT_LENGTH_MAX: 1023,
        },
        DEFAULT_LIMIT_PER_PAGE: 10
    }
}



module.exports = CONSTANTS;

