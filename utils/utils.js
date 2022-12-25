export const urlRegEx = /^(http|https):\/\/(www\.)?[a-z0-9-._~:/?[\]@!$&'()*+,;=]+#?/i;

export const allowedCors = [
  'https://my-domain.com',
  'http://my-domain.com',
  'localhost:3000',
];

export const messages = {
  pageNotFoundErrorMessage: 'Страница не найдена',
  unknownErrorMessage: 'Неизвестная ошибка',
  authorizationNeededMessage: 'Необходима авторизация',
  enterValidUrlMessage: 'Введите корректный URL',
  enterValidEmailMessage: 'Введите корректный email',
  invalidDataMessage: 'Переданы некорректные данные',
  youCantDeletNotYourMovieMessage: 'Вы не можете удалить чужой фильм',
  userUnfoundMessage: 'Пользователь не найден',
  userWithSameEmailMessage: 'Пользователь с такой почтой уже существует',
  uncorrectCredentialsMessage: 'Неправильные почта или пароль',
  movieNotFoundMessage: 'Фильм не найден',
};
