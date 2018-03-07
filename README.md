# Catch Async

Utility used to wrap root async functions to avoid uncaught promise errors to go silent.

catchAsync is intented for use in the root-level of an asyncronous chain of
functions, basically avoiding the need of using `try/catch` and risking to leave silent errors in code.

# Documentation

Check the API docs [here](api.md)
