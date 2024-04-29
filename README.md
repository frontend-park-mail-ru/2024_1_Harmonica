# 2024_1_Harmonica
Фронтенд проекта Pinterest команды "Harmonica"

### Участники команды
 1. [Амирова Лилиана](https://github.com/endloc)
 2. [Купцов Гавриил](https://github.com/Naruto-sys)
 3. [Костин Глеб](https://github.com/glebkos)

### Внешние ссылки
 - [Figma](https://www.figma.com/file/zRx9iBFVMZe01acfiQyfzO/My-Pinterest?type=design&node-id=0%3A1&mode=design&t=vkSl2cqoTW0Vvj60-1)
 - [Backend](https://github.com/go-park-mail-ru/2024_1_Harmonica)
 - [Deploy](https://harmoniums.ru/)
 - [Jira](https://harmonica.atlassian.net/jira/software/projects/HAR/boards/1)

### Запуск сервера

 1. Клонируем проект (подробнее [здесь](https://docs.github.com/ru/repositories/creating-and-managing-repositories/cloning-a-repository))
 2. Добавляем конфиг `server/configs/harmonium.conf` в nginx
3. Перед запуском в прод необходимо выполнить команду `make production` из корня проекта
4. После этого запускаем nginx

  ### Правила оформления Pull Requests
  1. Ветка создается с названием `har-###-action-description`, где ### - номер задачи в jira, action - add/update/fix/delete и т.д., description - лаконичное описание.
  2. Коммиты должены быть названы по шаблону `HAR-###: description`.
  3. При создании Pull Request'а нужно указать в описании ссылку на задачу в jira. 
  4. Для того, чтобы залить изменения в ветку develop нужен апрув от [Кости](https://t.me/PassPort_Guardian)

   
