class LibrariesController < ApplicationController
  before_action :set_library, only: [:show, :edit, :update, :destroy]

  def index
    @libraries = Library.all
  end

  def show
    @levels = @library.levels
    if params[:level_id]
      @level = Level.find(params[:level_id])
    else
      @level = Level.new(library_id: @library.id)
    end
  end

  def new
    @library = Library.new
  end

  def edit
  end

  def create
    @library = Library.new(library_params)

    respond_to do |format|
      if @library.save
        format.html { redirect_to library_url(@library), notice: "Library was successfully created." }
        format.json { render :show, status: :created, location: @library }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @library.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @library.update(library_params)
        format.html { redirect_to library_url(@library), notice: "Library was successfully updated." }
        format.json { render :show, status: :ok, location: @library }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @library.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @library.destroy

    respond_to do |format|
      format.html { redirect_to libraries_url, notice: "Library was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_library
    @library = Library.find(params[:id])
  end

  def library_params
    params.require(:library).permit(:title, :code, :teacher_id)
  end
end
