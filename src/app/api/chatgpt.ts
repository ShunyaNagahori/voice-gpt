export const getRes = async (text: String) => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {

          "role": "system",
          "content": "日本語で返答してください。"

        },
        {
          "role": "user",
          "content": text
        }
      ]
    }),
  });

  const json = await res.json();
  return json;
}
