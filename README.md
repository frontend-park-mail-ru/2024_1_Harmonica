# 2024_1_Harmonica
Фронтенд проекта Pinterest команды "Harmonica"

### Участники команды
 1. [Амирова Лилиана](https://github.com/endloc)
 2. [Купцов Гавриил](https://github.com/Naruto-sys)
 3. [Костин Глеб](https://github.com/glebkos)

### Внешние ссылки
 - [Figma](https://www.figma.com/file/zRx9iBFVMZe01acfiQyfzO/My-Pinterest?type=design&node-id=0%3A1&mode=design&t=vkSl2cqoTW0Vvj60-1)
 - [Backend](https://github.com/go-park-mail-ru/2024_1_Harmonica)
 - [Deploy](http://89.111.174.111:8000/)

### Запуск сервера

 1. Клонируем проект (подробнее [здесь](https://docs.github.com/ru/repositories/creating-and-managing-repositories/cloning-a-repository))
 2. Заходим в корень проекта и вводим команду `npm install`
 3. Для запуска сервера используется Node.js, поэтому прежде его необходимо установить.
    - Существуют [установщики](https://nodejs.org/en/download/) Node.js для Windows, MacOS и другие платформы
    - Также можно через терминал
      
      **MacOS**

      Проще всего через пакетный менеджер `brew` для этого надо ввести в терминал:
      
      ```
      brew install node
      ```
      Существует еще [ряд способов для MacOS](https://nodejs.org/en/download/package-manager#macos)
      
      **Ubuntu**
      
      Используем команду в терминале:
      
      ```
      sudo apt install nodejs
      ```

      **Windows**

      Пишем в терминал:

      ```
      winget install OpenJS.NodeJS
      # or for LTS
      winget install OpenJS.NodeJS.LTS
      ```
      [Еще способы для Windows](https://nodejs.org/en/download/package-manager#windows-1)

      **Другие платформы**

      [В этом гайде](https://nodejs.org/en/download/package-manager) показаны способы установки для разных платформ
   ### Запускаем сервер 
   
   Из корня проекта запускаем команду в терминале: 
   ```
   node server/server.js
   ```
   Если необходимо посенять порт для web сервера заходим в файл `/server/server.js` и меняем переменную `PORT`
   
   По умолчанию сервер работает на порту 8000
