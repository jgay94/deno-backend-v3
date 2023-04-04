import { log, setupLogger } from "@utils/logger/mod.ts";
import { BaseError } from "@utils/errors/mod.ts";

// Import BaseError and create a custom error class that extends it
class MyCustomError extends BaseError<"MyCustomError"> {
  constructor(message: string, cause?: unknown) {
    super({ name: "MyCustomError", message, cause });
  }
}

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
    throw new MyCustomError(
      "This is a custom error message",
      new Error("Some cause"),
    );
  } catch (error) {
    // Check if the caught error is an instance of MyCustomError
    if (error instanceof MyCustomError) {
      log.error(`Caught a MyCustomError: ${error.message}`);
      log.error(`Error name: ${error.name}`);
      log.error(`Error cause: ${error.cause}`);
      log.error(`Error stack: ${error.stack}`);
    } else {
      // If the error is not an instance of MyCustomError, re-throw it
      throw error;
    }
  }
}

// Call the test function to test the custom error
await testCustomError();
