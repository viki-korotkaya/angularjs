
        angular.module("taskListApp", [])
            .constant("baseUrl", "http://localhost:2403/tasks/")
            .controller("TaskListCtrl", function ($scope, $http, baseUrl) {
                $scope.refresh = function () {
                    $http.get(baseUrl).success(function (data) {
                        $scope.tasks = data;
                    });
                }

                // создание нового элемента
                //?очистить поля ввода
                $scope.create = function (task) {
                    $http.post(baseUrl, task).success(function (task) {
                        $scope.tasks.push(task);
                        $scope.currentTask.name = "";
                        $scope.currentTask.dueDate = "";
                        $scope.currentTask.description = "";
                        $scope.currentTask.completed = false;
                    });
                }

                // обновление элемента
                $scope.update = function (task) {
                // HTTP PUT
                // Отправка PUT запроса для обновления определенной записи на сервере
                    $http({
                        url: baseUrl + task.id,
                        method: "PUT",
                        data: task
                    }).success(function (modifiedTask) {
                        for (var i = 0; i < $scope.tasks.length; i++) {
                            if ($scope.tasks[i].id == modifiedTask.id) {
                                $scope.tasks[i] = modifiedTask;
                                $scope.currentTask.name = "";
                                $scope.currentTask.dueDate = "";
                                $scope.currentTask.description = "";
                                $scope.currentTask.completed = false;
                                break;
                            }
                        }
            
                    });
                }

                // удаление элемента из модели
                $scope.delete = function (task) {
                    $http({
                        method: "DELETE",
                        url: baseUrl + task.id
                    }).success(function () {
                        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
                    });
                }

                // редеактирование существующего или создание нового элемента
                $scope.editOrCreate = function (task) {
                    $scope.currentTask = task ? angular.copy(task) : {};
                    
                }

                // сохранение изменений
                $scope.saveEdit = function (task) {
                // Если у элемента есть свойство id выполняем редактирование
                // В данной реализации новые элементы не получают свойство id поэтому редактировать их невозможно (будет исправленно в слудующих примерах)
                    if (angular.isDefined(task.id)) {
                        $scope.update(task);

                    } else {
                        $scope.create(task);
                    }
                }

    

                $scope.refresh();
            });

   