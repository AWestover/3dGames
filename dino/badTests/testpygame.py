import pygame
import json

pygame.init()
width=950;
height=600;
screen = pygame.display.set_mode((width, height))
screen = screen.convert()


def get_pos():
    tPos =  pygame.mouse.get_pos()
    return tPos

pygame.display.flip() # paint screen one time
running=True
while running:
    # screen.fill((0,0,255, 100))
    pos=get_pos()
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            # Set the x, y postions of the mouse click
            x, y = event.pos
            if jaegerImg.get_rect().collidepoint(x-x1, y-y1):
                print('clicked on Jaeger')
                SPECIES = "robot"
                choosen = True
                selected = 0
            elif buggerImg.get_rect().collidepoint(x-x2, y-y2):
                print('clicked on Buggers')
                SPECIES = "aliens"
                choosen = True
                selected = 1
            elif illyrianImg.get_rect().collidepoint(x-x3, y-y3):
                print('clicked on Illyrians')
                SPECIES = "fairy"
                choosen = True
                selected = 2
            elif rx_coor<x<(rx_coor+rx_size) and ry_coor<y<(ry_coor+ry_size):
                if choosen:
                    print("Clicked start. Your chosen species: "+SPECIES)
                    with open("start.json", "w") as f:
                        json.dump({"species": SPECIES+" rear"}, f)
                    end()
                else:
                    print("Have not chosen yet")

    pygame.display.flip()

