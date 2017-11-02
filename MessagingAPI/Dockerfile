FROM microsoft/aspnetcore:2.0
ARG source
WORKDIR /app
ENV ASPNETCORE_URLS http://+:3000
EXPOSE 3000
EXPOSE 5671
COPY ${source:-obj/Docker/publish} .
ENTRYPOINT ["dotnet", "MessagingAPI.dll"]
