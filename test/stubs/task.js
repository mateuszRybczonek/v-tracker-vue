const taskSpy = (isActive = false, isResolved = false) => {
  return {
    isActive,
    isResolved,
    run: jest.fn()
  }
}

export { taskSpy }
