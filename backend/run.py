from backend import build_app

app = build_app()

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8888)