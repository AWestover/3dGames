# pick coords

from pynput import mouse
import json

def markRect():
    coords = {"x":-1, "y":0, "w":0, "h": 0}
    # Collect events until released
    with mouse.Listener(on_click=on_click) as listener:
        listener.join()


def on_click(x, y, button, pressed):
    print('{0} at {1}'.format('Pressed' if pressed else 'Released',(x, y)))
    if not pressed:
        if coords["x"] < 0:
            coords["x"] = x; coords["y"] = y;
        else:
            coords["w"] = x-coords["x"]; coords["h"] = y-coords["y"];
            with open("coords.json", "w") as f:
                json.dump(coords, f)
            print(coords)
            return False


if __name__ == "__main__":
    markRect()
