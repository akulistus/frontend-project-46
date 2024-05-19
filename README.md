### Hexlet tests and linter status:
[![Actions Status](https://github.com/akulistus/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/akulistus/frontend-project-46/actions)
[![Actions Status](https://github.com/akulistus/frontend-project-46/actions/workflows/project-check.yml/badge.svg)](https://github.com/akulistus/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/87b16d1dd707ca761833/maintainability)](https://codeclimate.com/github/akulistus/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/87b16d1dd707ca761833/test_coverage)](https://codeclimate.com/github/akulistus/frontend-project-46/test_coverage)

# Установка
1. Склонировать репозиторий в любое удобное место.
2. Установить зависимости командой:
    ```
    $ npm install
    ```
3. Создать линк командой:
    ```
    $ npm link
    ```
4. Пользоваться.
# Использование
Утилита вызывается по ключевому слову **gendiff**.<br>
Пример использования утилиты:
```
$ gendiff file1 file2 --format plain
```
# Описание

Утилита сравнения файлов, выводящая разницу между содержанием двух файлов. Эта программа выводит построчно изменения, сделанные в файле.

Утилита может работать с такими форматами, как:
- json
- yaml
- yml
## Формат вывода
Утилита поддерживает три формата вывода результата сравнения:
- **plain**<br>
    Пример:
    [![asciicast](https://asciinema.org/a/VC3x3wr0YkrXJLIl9aIPNsoEF.svg)](https://asciinema.org/a/VC3x3wr0YkrXJLIl9aIPNsoEF)
- **stylish**<br>
    Пример:
    [![asciicast](https://asciinema.org/a/pxDqqvXvBHPuVBDMDu1usYjaV.svg)](https://asciinema.org/a/pxDqqvXvBHPuVBDMDu1usYjaV)
- **json**<br>
    Пример:
    [![asciicast](https://asciinema.org/a/ikFsEutF1Syz2yy3qooFi2lEi.svg)](https://asciinema.org/a/ikFsEutF1Syz2yy3qooFi2lEi)

# Требования
Для установки и использования необходим nodejs.


# Справка
```
Usage: index [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```
<!-- [![asciicast](https://asciinema.org/a/tCe68yNZz94ue7x3bmTVukAIi.svg)](https://asciinema.org/a/tCe68yNZz94ue7x3bmTVukAIi) -->
