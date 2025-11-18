const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER ?? '';

export default function EnvironmentVariables() {
  const display = HTTP_SERVER || "(not set)";
  return (
    <div id="wd-environment-variables">
      <h3>Environment Variables</h3>
      <p>Remote Server: {display}</p>
      <hr />
    </div>
  );
}