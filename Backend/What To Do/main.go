package main

import (
	"context"
	"fmt"
	"net/http"
	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"

)

// Task struct
type Task struct {
	ID          string    `bson:"id" json:"id"`
	Title       string `bson:"title" json:"title"`
	Description string `bson:"description" json:"description"` 
}

// Global variables for MongoDB client and collection
var client *mongo.Client
var collection *mongo.Collection

// Connect to MongoDB
func connectToMongoDB() error {
	uri := "mongodb+srv://whattodo:3QJ_SsVUi9gd8_c@cluster0.2j8r9ti.mongodb.net/task"
	clientOptions := options.Client().ApplyURI(uri)
	var err error
	client, err = mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return err
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return err
	}
	fmt.Println("Connected to MongoDB!")
	collection = client.Database("testdb").Collection("tasks")
	return nil
}

// echo handlers

// create
func createTask(c echo.Context) error {
    task := new(Task)
    if err := c.Bind(task); err != nil {
		return err
    }

    _, err := collection.InsertOne(context.TODO(), task)
    if err != nil {
		return err
	}

    return c.JSON(http.StatusCreated, task)
}

// get tasks
func getTasks(c echo.Context) error {
    cur, err := collection.Find(context.TODO(), bson.D{})
    if err != nil {
        return err
    }
    defer cur.Close(context.TODO())
    var tasks []Task
    for cur.Next(context.TODO()) {
        var task Task
        err := cur.Decode(&task)
        if err != nil {
            return err
        }
        tasks = append(tasks, task)
    }
    if err := cur.Err(); err != nil {
        return err
    }
    return c.JSON(http.StatusOK, tasks)
}

// get task
func getTask(c echo.Context) error {
    id := c.Param("id")
    var task Task
    err := collection.FindOne(context.TODO(), bson.D{{"id", id}}).Decode(&task)
    if err != nil {
        return err
    }
    return c.JSON(http.StatusOK, task)
}

// update task
func updateTask(c echo.Context) error {
    id := c.Param("id")
    task := new(Task)
    if err := c.Bind(task); err != nil {
        return err
    }
    _, err := collection.UpdateOne(context.TODO(), bson.D{{"id", id}}, bson.D{{"$set", task}})
    if err != nil {
        return err
    }
    return c.JSON(http.StatusOK, task)
}

// delete task
func deleteTask(c echo.Context) error {
    id := c.Param("id")
    _, err := collection.DeleteOne(context.TODO(), bson.D{{"id", id}})
    if err != nil {
        return err
    }
    return c.NoContent(http.StatusNoContent)
}





func main() {
	// connect to db
    err := connectToMongoDB()
    if err != nil {
        log.Fatal(err)
    }
    defer client.Disconnect(context.TODO())

	//e echo
	e := echo.New()
	//mid ware
	e.Use(middleware.Logger())
    e.Use(middleware.Recover())


    // Routes
    e.POST("/tasks", createTask)
    e.GET("/tasks", getTasks)
    e.GET("/tasks/:id", getTask)
    e.PUT("/tasks/:id", updateTask)
    e.DELETE("/tasks/:id", deleteTask)
	



	e.Logger.Fatal(e.Start(":1323"))
}
