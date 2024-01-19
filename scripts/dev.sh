#!/bin/bash

# Start a new tmux session
tmux new-session -d -s dev
tmux send-keys -t dev "tmux source-file ./.tmux.conf" C-m

# Split the window into panes
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v

tmux select-pane -t 0
tmux resize-pane -U 5
tmux select-pane -t 2
tmux resize-pane -U 5

# Run commands in each pane
tmux send-keys -t dev:0.0 'npm run browser:dev' C-m
tmux send-keys -t dev:0.1 'npm run app:dev' C-m
tmux send-keys -t dev:0.2 'npm run lib:dev' C-m
tmux send-keys -t dev:0.3 'npm run backend:dev' C-m

# Attach to the session
tmux attach -t dev
