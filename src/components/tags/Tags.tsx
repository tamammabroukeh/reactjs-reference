import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Search, Plus } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
import { fetchTags, fetchColors, createTag } from "@/lib/api-tags";
import { Tag, Color, SelectedTag } from "@/types/tag";

const TagTamer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);
  const [lastSelectedTagId, setLastSelectedTagId] = useState<string | null>(
    null
  );

  // Fetch tags and colors
  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const { data: colors = [], isLoading: colorsLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
  });

  // Create tag mutation
  const createTagMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      //   toast({
      //     title: "Success",
      //     description: "Tag created successfully!",
      //   });
      setSearchTerm("");
    },
    onError: () => {
      //   toast({
      //     title: "Error",
      //     description: "Failed to create tag. Please try again.",
      //     variant: "destructive",
      //   });
    },
  });

  // Filter tags based on search term
  const filteredTags = tags.filter((tag: Tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if search term matches any existing tag
  const exactMatch = tags.some(
    (tag: Tag) => tag.name.toLowerCase() === searchTerm.toLowerCase()
  );

  const handleTagSelect = (tag: Tag) => {
    const isAlreadySelected = selectedTags.some(
      (selected) => selected.id === tag.id
    );
    if (!isAlreadySelected) {
      const newSelectedTag: SelectedTag = {
        ...tag,
        color: colors[0]?.hex || "#3B82F6", // Default color
      };
      setSelectedTags([...selectedTags, newSelectedTag]);
      setLastSelectedTagId(tag.id);
      setSearchTerm("");
    }
  };

  const handleTagRemove = (tagId: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
    if (lastSelectedTagId === tagId) {
      setLastSelectedTagId(null);
    }
  };

  const handleColorSelect = (color: Color) => {
    if (lastSelectedTagId) {
      setSelectedTags(
        selectedTags.map((tag) =>
          tag.id === lastSelectedTagId ? { ...tag, color: color.hex } : tag
        )
      );
    }
  };

  const handleCreateTag = () => {
    if (searchTerm.trim()) {
      createTagMutation.mutate({ name: searchTerm.trim() });
    }
  };
  console.log("selectedTags", selectedTags);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Input with Selected Tags Inside */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
            <Form>
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 min-h-12 p-3 border-2 rounded-md border-input bg-background focus-within:border-blue-500 transition-colors">
                  {/* Selected Tags Inside Input */}
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      style={{ backgroundColor: tag.color }}
                      className={`text-white px-2 py-1 text-sm flex items-center gap-1 ${
                        lastSelectedTagId === tag.id
                          ? "ring-2 ring-gray-400"
                          : ""
                      }`}
                    >
                      {tag.name}
                      <button
                        onClick={() => handleTagRemove(tag.id)}
                        className="ml-1 hover:bg-black/20 rounded-full p-0.5 transition-colors"
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {/* Search Input */}
                  <div className="flex-1 flex items-center min-w-0">
                    <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder={
                        selectedTags.length === 0
                          ? "Search tags or type to create new..."
                          : "Search..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm min-w-0"
                    />
                  </div>
                </div>
              </div>
            </Form>
          </Formik>

          {/* Create Tag Button */}
          {searchTerm && !exactMatch && filteredTags.length === 0 && (
            <div className="mt-4">
              <Button
                onClick={handleCreateTag}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={createTagMutation.isPending}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create tag "{searchTerm}"
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Tags */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {searchTerm
              ? `Search Results (${filteredTags.length})`
              : "Available Tags"}
          </h3>
          {tagsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading tags...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredTags.map((tag: Tag) => {
                const isSelected = selectedTags.some(
                  (selected) => selected.id === tag.id
                );
                return (
                  <Button
                    key={tag.id}
                    variant={isSelected ? "secondary" : "outline"}
                    onClick={() => handleTagSelect(tag)}
                    disabled={isSelected}
                    className={`h-auto p-3 text-left justify-start transition-all hover:scale-105 ${
                      isSelected
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    <span className="truncate">{tag.name}</span>
                  </Button>
                );
              })}
            </div>
          )}

          {!tagsLoading &&
            filteredTags.length === 0 &&
            searchTerm &&
            exactMatch && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Tag already exists in your collection
                </p>
              </div>
            )}
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Color Palette{" "}
            {lastSelectedTagId && "(Click to change last selected tag color)"}
          </h3>
          {colorsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading colors...</p>
            </div>
          ) : (
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
              {colors.map((color: Color) => (
                <div
                  key={color.hex}
                  className={`group cursor-pointer ${
                    lastSelectedTagId ? "hover:scale-110" : ""
                  }`}
                  title={color.name}
                  onClick={() => handleColorSelect(color)}
                >
                  <div
                    className={`w-full aspect-square rounded-lg border-2 border-gray-200 transition-all ${
                      lastSelectedTagId ? "hover:border-gray-400" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-xs text-gray-600 mt-1 text-center truncate">
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          )}
          {!lastSelectedTagId && selectedTags.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Click on a tag to select it, then click on a color to change its
              color.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TagTamer;
