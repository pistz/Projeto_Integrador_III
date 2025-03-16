import sys
import os
from src.api.server.server import app

sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000,debug=True)