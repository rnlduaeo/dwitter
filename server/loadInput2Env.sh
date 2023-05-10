values=$(cat ~/.env/dwitter/input.json)
for s in $(echo $values | jq -r "to_entries|map(\"\(.key)=\(.value|tostring|gsub(\"^\\\\$\"; \"\\\"\\\"\"))\")|.[]"); do
    export $s
done
