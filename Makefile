src_dir = src
version = $(shell cat version.txt)
projectName = jquery-chained
finalFile = $(projectName)-$(version).js
tmp = $(finalFile).tmp
modules = $(src_dir)/$(projectName).js
$(finalFile): $(modules)
	@@echo "Building" $(finalFile) "..."
	@@cat -s $(modules) > $(tmp)
	@@echo "Copying" $(tmp) "to" $(finalFile) "..."
	@@cp -u $(tmp) $(finalFile)
	@@echo "Building complete."