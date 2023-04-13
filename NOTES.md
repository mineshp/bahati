# HeroIcons

https://unpkg.com/browse/@heroicons/react@2.0.13/24/outline/

# Debugging

Internal Server Error

Check Cloudwatch logs /aws/lambda/BahatiProduction-GetCatchallHTTPLambda-....

## Invariant failed: SESSION_SECRET must be set

Set SESSION_SECRET

```bash
AWS_PROFILE=min-aws npx arc env --add --env production SESSION_SECRET $(openssl rand -hex 32)
```
