# Use the Microsoft Universal devcontainer base image
FROM mcr.microsoft.com/devcontainers/universal:2

# Update npm to latest version and install bun globally
RUN npm i -g npm@latest
RUN npm i -g bun

# Set the working directory
WORKDIR /workspaces

# Keep container running
CMD ["sleep", "infinity"]
