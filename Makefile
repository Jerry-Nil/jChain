src_dir = src
version = $(shell cat version.txt)
projectName = jquery-chained
finalFile = $(projectName)-$(version).js
modules = $(src_dir)/jquery-chained.js
$(finalFile): $(modules)
	@@echo "Building" $(finalFile) "..."
	@@cat -s $(modules) > $(finalFile)
	@@echo "Building complete."