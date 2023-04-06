import { log, setupLogger } from "@utils/logger/mod.ts";
import { BaseError, isCustomError } from "@utils/errors/mod.ts";

type MyCustomErrorName =
  | "MyCustomError"
  | "MyCustomError2"
  | "MyCustomError3";

// // Import BaseError and create a custom error class that extends it
class MyCustomError extends BaseError<MyCustomErrorName> {}

await setupLogger("INFO");

log.debug("Hello world");
log.info("Hello world");
log.warning("Hello world");
log.error("Hello world");
log.critical("Hello world");

// Function to test throwing and catching the custom error
async function testCustomError() {
  try {
    // Throw the custom error with a message
    throw new MyCustomError({
      name: "MyCustomError2",
      message: "This is a custom error",
    });
  } catch (error) {
    // Check if the caught error is a custom error
    if (isCustomError(error)) {
      // Use a switch statement to handle different custom error names
      switch (error.name) {
        case "MyCustomError1":
          log.error("Caught a MyCustomError");
          break;
        case "MyCustomError2":
          log.error("Caught a MyCustomError2");
          break;
        case "MyCustomError3":
          log.error("Caught a MyCustomError3");
          break;
        default:
          log.error("Caught a custom error");
          break;
      }

      // Log the error message
      log.error(`Error message: ${error.message}`);

      // Check if the cause is available, then log it
      if (error.cause !== undefined) {
        log.error(`Error cause: ${error.cause}`);
      }

      // Check if the stack is available, then log it
      if (error.stack !== undefined) {
        log.error(`Error stack: ${error.stack}`);
      }
    } else {
      // If the error is not a custom error, re-throw it
      log.error(`Error name: ${error.name}`);
      log.error(`Error message: ${error.message}`);
      log.error(`Error cause: ${error.cause}`);
      log.error(`Error stack: ${error.stack}`);
      throw error;
    }
  }
}

// Call the test function to test the custom error
await testCustomError();
