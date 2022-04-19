#Curl för threads
curl -X POST http://localhost:3001/threads -H 'Content-Type: application/json' -d '{\"title\":\"hello\",\"content\":\"hello world\"}'

#Curl för replies
curl -X POST http://localhost:3001/threads/625f12a5b8b383715d889a44/replies -H 'Content-Type: application/json' -d '{\"name\":\"Alexander Klum\",\"answerContent\":\"Hello back!\"}'