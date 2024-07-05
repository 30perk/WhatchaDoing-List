package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Task struct
type Task struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
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

// createTask handles task creation
func createTask(c echo.Context) error {
	task := new(Task)
	if err := c.Bind(task); err != nil {
		return err
	}

	// Insert task into tasks collection
	result, err := collection.InsertOne(context.TODO(), task)
	if err != nil {
		return err
	}

	// Set the ID of the task to the generated ID
	task.ID = result.InsertedID.(primitive.ObjectID)

	return c.JSON(http.StatusCreated, task)
}

// getTasks handles fetching all tasks
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

// updateTask handles updating a task
func updateTask(c echo.Context) error {
	idParam := c.Param("id")
	id, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid task ID")
	}
	task := new(Task)
	if err := c.Bind(task); err != nil {
		return err
	}
	filter := bson.M{"_id": id}
	update := bson.M{"$set": task}
	_, err = collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, task)
}

// deleteTask handles deleting a task
func deleteTask(c echo.Context) error {
	idParam := c.Param("id")
	id, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid task ID")
	}
	filter := bson.M{"_id": id}
	result, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "Task not found")
	}
	return c.NoContent(http.StatusNoContent)
}

func main() {
	// Connect to MongoDB
	err := connectToMongoDB()
	if err != nil {
		log.Fatal(err)
	}

	// Initialize Echo
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}))

	// Routes
	e.POST("/tasks", createTask)
	e.GET("/tasks", getTasks)
	e.PUT("/tasks/:id", updateTask)
	e.DELETE("/tasks/:id", deleteTask)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
