#AI-Spritesheet-Factory
======================

Spritesheet generator for Adobe Illustrator (AI). Spritesheets are used on webpages to combine multiple images into one file. Each image is displayed separately by cropping the image on the spritesheet.

## Demo
======================

<iframe src="http://player.vimeo.com/video/63556797" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <p><a href="http://vimeo.com/63556797">View AI-Spritesheet-Factory Demo</a> on Vimeo.</p>

## Project Contents
======================

* __ai-spritesheet-factory-config.yml__ - configuration file used by the script, this should reside in the same directory as your AI project file (it will be generated if absent).
* __ai-spritesheet-factory-demo.ai__ - AI demonstration file
* __AI-SpriteSheet-Factory.jsx__ - the script for installation in AI's Scripts menu

## Installation
======================

To include in Adobe Illustrator's Scripts menu (File > Scripts), save the script in the Scripts folder, located in the 
/Illustrator CS6/Presets folder in your Illustrator CS6 installation directory. The script’s will appear as "AI-SpriteSheet-Factory" in the Scripts menu. You will need to restart Illustrator for the script to appear in the menu.

## Instructions
======================

This Adobe Illustrator Script will export spritesheets from properly formatted Adobe Illustrator files. 

1. Create a new Adobe Illustrator file. 
2. Create a layer for each sprite. 
3. Give the sprite layers a name prefix as per the settings in the configuration file (one will be generated with default values if it's not found on first run). All other named layers will be ignored.
4. Create a rectangular path on each sprite layer with the "area" prefix layer name from the configuration file.
5. Optionally, create a rectangular path on each sprite layer with the "hit" prefix layer name to create a hit area (for JavaScript purposes).
6. Spritesheet graphics will ordered in the order they appear in the Layer panel.
7. Run the script from File > Scripts > AI-SpriteSheet-Factory menu.
8. The script will generate configuration file with your project if it is missing and will create a "build" directory that contains your spritesheet and associated code. The output in this folder will be:
	* __An image file__ - the spritesheet.
	* __A CSS file__ - a style rule using your spritesheet.
	* __An HTML file__ - to test your spritesheet in a browser.
	* __A parameters file__ - contains the coordinates of your sprite boundary areas and hit areas on the spritesheet. This may be used in JavaScript or CSS for changing the sprite shown on a webpage.

## Copyright and License
======================

Copyright 2013 Anselm Bradford.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.