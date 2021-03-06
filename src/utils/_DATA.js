let users = {
    sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL:
            "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-teacher-312a499a08079a12-512x512.png",
        answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
            am8ehyc8byjqgar0jgpub9: "optionTwo",
            loxhs1bqm25b708cmbf3g: "optionTwo"
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"]
    },
    tylermcginnis: {
        id: "tylermcginnis",
        name: "Tyler McGinnis",
        avatarURL:
            "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png",
        answers: {
            vthrdm985a262al8qx3do: "optionOne",
            xj352vofupe1dqz9emx13r: "optionTwo"
        },
        questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"]
    },
    johndoe: {
        id: "johndoe",
        name: "John Doe",
        avatarURL:
            "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-business-man-399587fe24739d5a-512x512.png",
        answers: {
            xj352vofupe1dqz9emx13r: "optionOne",
            vthrdm985a262al8qx3do: "optionTwo",
            "6ni6ok3ym7mf1p33lnez": "optionOne"
        },
        questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"]
    }
};

let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        optionOne: {
            votes: ["sarahedo"],
            text: "have horrible short term memory"
        },
        optionTwo: {
            votes: [],
            text: "have horrible long term memory"
        },
        comments: []
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: "6ni6ok3ym7mf1p33lnez",
        author: "johndoe",
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: "become a superhero"
        },
        optionTwo: {
            votes: ["johndoe", "sarahedo"],
            text: "become a supervillian"
        },
        comments: []
    },
    am8ehyc8byjqgar0jgpub9: {
        id: "am8ehyc8byjqgar0jgpub9",
        author: "sarahedo",
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: "be telekinetic"
        },
        optionTwo: {
            votes: ["sarahedo"],
            text: "be telepathic"
        },
        comments: []
    },
    loxhs1bqm25b708cmbf3g: {
        id: "loxhs1bqm25b708cmbf3g",
        author: "tylermcginnis",
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: "be a front-end developer"
        },
        optionTwo: {
            votes: ["sarahedo"],
            text: "be a back-end developer"
        },
        comments: []
    },
    vthrdm985a262al8qx3do: {
        id: "vthrdm985a262al8qx3do",
        author: "tylermcginnis",
        timestamp: 1489579767190,
        optionOne: {
            votes: ["tylermcginnis"],
            text: "find $50 yourself"
        },
        optionTwo: {
            votes: ["johndoe"],
            text: "have your best friend find $500"
        },
        comments: ["aap8sdxppna8oabnxljzcv"]
    },
    xj352vofupe1dqz9emx13r: {
        id: "xj352vofupe1dqz9emx13r",
        author: "johndoe",
        timestamp: 1493579767190,
        optionOne: {
            votes: ["johndoe"],
            text: "write JavaScript"
        },
        optionTwo: {
            votes: ["tylermcginnis"],
            text: "write Swift"
        },
        comments: ["pj352vofupe1dqz9emx13r"]
    }
};

let comments = {
    aap8sdxppna8oabnxljzcv: {
        id: "aap8sdxppna8oabnxljzcv",
        qid: "vthrdm985a262al8qx3do",
        text: "We all need Money",
        author: "tylermcginnis",
        timestamp: 1518122597860
    },
    pj352vofupe1dqz9emx13r: {
        id: "pj352vofupe1dqz9emx13r",
        qid: "xj352vofupe1dqz9emx13r",
        text: "Javascript ofcourse",
        author: "tylermcginnis",
        timestamp: 1518122597860
    },
};

function generateUID() {
    return (
        Math.random()
            .toString(36)
            .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15)
    );
}

export function _getUsers() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...users }), 1000);
    });
}

export function _getQuestions() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...questions }), 1000);
    });
}

export function _getComments() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...comments }), 1000);
    });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText
        },
        optionTwo: {
            votes: [],
            text: optionTwoText
        },
        comments: []
    };
}

export function _saveQuestion(question) {
    return new Promise((res, rej) => {
        const authedUser = question.author;
        const formattedQuestion = formatQuestion(question);

        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion
            };

            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions: users[authedUser].questions.concat([
                        formattedQuestion.id
                    ])
                }
            };

            res(formattedQuestion);
        }, 1000);
    });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers: {
                        ...users[authedUser].answers,
                        [qid]: answer
                    }
                }
            };

            questions = {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    [answer]: {
                        ...questions[qid][answer],
                        votes: questions[qid][answer].votes.concat([authedUser])
                    }
                }
            };

            res();
        }, 500);
    });
}

export function _saveUser(user) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            users = {
                ...users,
                [user.id]: {
                    ...user
                }
            };
            res();
        }, 500);
    });
}

function formatComment({ qid, text, author }) {
    return {
        id: generateUID(),
        qid,
        timestamp: Date.now(),
        author,
        text
    };
}

export function _saveComment(comment) {
    return new Promise((res, rej) => {
        const finalComment = formatComment(comment);
        const commentId = finalComment.id;
        setTimeout(() => {
        questions = {
            ...questions,
            [finalComment.qid]: {
                ...questions[finalComment.qid],
                comments: questions[finalComment.qid].comments.concat([commentId])
            }
        };
        comments = {
            ...comments,
            [finalComment.id]: {
                ...finalComment
            }
        };
        res(finalComment); // Update Redux here
        }, 1000);
    });
}
