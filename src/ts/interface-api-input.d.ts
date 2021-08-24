interface RegistrationInput {
  name: string
  password: string
}

interface LoginInput {
  name: string
  password: string
}

interface MessageInput {
  text: string
  type?: MessageType
}
