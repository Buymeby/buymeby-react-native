function timeToHumanReadable (time) {
  if (!time) {
    return ''
  }

  let date = time;
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export default timeToHumanReadable
