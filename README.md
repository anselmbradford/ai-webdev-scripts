#AI-Spritesheet-Factory
======================

Spritesheet generator for Adobe Illustrator (AI). Spritesheets are used on webpages to combine multiple images into one file. Each image is displayed separately by cropping the image on the spritesheet.

## Project Contents
======================

* ai-spritesheet-factory-config.yml - configuration file used by the script, this should reside in the same directory as your AI project file (it will be generated if absent).
* ai-spritesheet-factory-demo.ai - AI demonstration file
* AI-SpriteSheet-Factory.jsx - the script for installation in AI's Scripts menu

## Instructions
======================

This Adobe Illustrator Script will export spritesheets from properly formatted Adobe Illustrator files. 

* Create a new Adobe Illustrator file. 
* Create a layer for each sprite. 
* Give the sprite layers a name prefix as per the settings in the configuration file (one will be generated with default values if it's not found on first run). All other named layers will be ignored.
* Create a rectangular path on each sprite layer with the "area" prefix layer name from the configuration file.
* Optionally, create a rectangular path on each sprite layer with the "hit" prefix layer name to create a hit area (for JavaScript purposes).
* Spritesheet graphics will ordered in the order they appear in the Layer panel.

## Installation
======================

To include in Adobe Illustrator's Scripts menu (File > Scripts), save the script in the Scripts folder, located in the 
/Illustrator CS6/Presets folder in your Illustrator CS6 installation directory. The script’s will appear as "AI-SpriteSheet-Factory" in the Scripts menu. You will need to restart Illustrator for the script to appear in the menu.

## Copyright and license
======================

Copyright 2013 Anselm Bradford.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.